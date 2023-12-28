import { useRouter } from 'next/router';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { Message } from '@/types/chat';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '@/components/ui/LoadingDots';
import { Document } from 'langchain/document';
import { supabase } from '@/lib/initSupabase';
import Layout, { useBooks } from '@/components/dashboard/layout';

export default function Page() {
  const [bookNamespace, setBookNamespace] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setActiveChat, books, loading: loadingBooks } = useBooks();
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
  }>({
    messages: [],
    history: [],
  });

  useEffect(() => {
    (async () => {
      if (loadingBooks || books.length == 0 || !router.query.slug) {
        return;
      }

      const filteredArray = books.filter((e: any) => {
        return e.namespace == `${router.query.slug}`;
      });

      if (filteredArray.length == 0) {
        router.push('/404');
        return;
      }

      const { data, error } = await supabase
        .from('messages')
        .select(' message, type, book_namespace')
        .eq('book_namespace', `${router.query.slug}`)
        .order('created_at', { ascending: false })
        .limit(30);

      data?.reverse();

      setBookNamespace(`${router.query.slug}`);
      setActiveChat(`${router.query.slug}`);

      if (data == null || data.length == 0) {
        setMessageState((state) => ({
          ...state,
          messages: [
            {
              message: 'Hi, upload your textbook!',
              type: 'apiMessage',
            },
          ],
          history: [],
        }));
        setLoading(false);
        return;
      }

      const updatedHistory:any = [];
      for (let i = 0; i < data.length; i += 2) {
          if (data[i] && data[i + 1]) {
              updatedHistory.push([
                  data[i].message,  
                  data[i + 1].message
              ]);
          }
      }

      setMessageState((state) => ({
        ...state,
        messages: data,
        history: updatedHistory, 
      }));

      setLoading(false);
    })();
  }, [router.query.slug, router, setActiveChat, books, loadingBooks]);

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<any>('');

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    const scrollToBottom = () => {
      if (messageListRef.current) {
        messageListRef.current.scrollTo({
          top: messageListRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    };
    scrollToBottom();
  }, [messages]);

  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (
      textAreaRef.current.value == '' ||
      textAreaRef.current.value == null ||
      !textAreaRef.current.value
    ) {
      alert('Please input a question');
      return;
    }

    const question = textAreaRef.current.value.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));

    await supabase
      .from('messages')
      .insert({
        message: question,
        type: 'userMessage',
        book_namespace: bookNamespace,
      });

    setLoading(true);
    textAreaRef.current.value = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
          bookNamespace,
        }),
      });
      const data = await response.json();
      console.log(data.sourceDocuments)
      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.text,
            },
          ],
          history: [...state.history, [question, data.text]],
        }));

        await supabase
          .from('messages')
          .insert({
            message: data.text,
            type: 'apiMessage',
            book_namespace: bookNamespace,
          });
      }

      setLoading(false);

      //scroll to bottom
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  }

  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && textAreaRef.current.value) {
      handleSubmit(e);
    } else if (e.key == 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="mx-auto flex flex-col gap-4 ">
        <h1 className="text-2xl font-bold leading-[1.1] tracking-tighter text-center">
          Chat With Your Textbooks
        </h1>
        <main className={styles.main}>
          <div className={styles.cloud}>
            <div ref={messageListRef} className={styles.messagelist}>
              {messages.map((message, index) => {
                let icon;
                let className;
                if (message.type === 'apiMessage') {
                  icon = (
                    <Image
                      key={index}
                      src="/bot-image.png"
                      alt="AI"
                      width="40"
                      height="40"
                      className={styles.boticon}
                      priority
                    />
                  );
                  className = styles.apimessage;
                } else {
                  icon = (
                    <Image
                      key={index}
                      src="/usericon.png"
                      alt="Me"
                      width="30"
                      height="30"
                      className={styles.usericon}
                      priority
                    />
                  );
                  // The latest message sent by the user will be animated while waiting for a response
                  className =
                    loading && index === messages.length - 1
                      ? styles.usermessagewaiting
                      : styles.usermessage;
                }
                return (
                  <>
                    <div key={`chatMessage-${index}`} className={className}>
                      {icon}
                      <div className={styles.markdownanswer}>
                        <ReactMarkdown linkTarget="_blank">
                          {message.message}
                        </ReactMarkdown>
                      </div>
                    </div>
                    
                  </>
                );
              })}
            </div>
          </div>
          <div className={styles.center}>
            <div className={styles.cloudform}>
              <form onSubmit={handleSubmit}>
                <textarea
                  disabled={loading}
                  onKeyDown={handleEnter}
                  ref={textAreaRef}
                  autoFocus={false}
                  rows={1}
                  maxLength={512}
                  id="userInput"
                  name="userInput"
                  placeholder={
                    loading ? 'Waiting for response...' : 'Enter a prompt here' //I just changed this here, but you can update it accordingly
                  }
                  // value={query}
                  className={styles.textarea}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.generatebutton}
                >
                  {loading ? (
                    <div className={styles.loadingwheel}>
                      <LoadingDots color="#000" />
                    </div>
                  ) : (
                    // Send icon SVG in input field
                    <svg
                      viewBox="0 0 20 20"
                      className={styles.svgicon}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
          {error && (
            <div className="border border-red-400 rounded-md p-4">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

Page.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
