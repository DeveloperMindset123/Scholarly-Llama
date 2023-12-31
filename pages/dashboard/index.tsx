'use client';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { Message } from '@/types/chat';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '@/components/ui/LoadingDots';
import { Document } from 'langchain/document';
import { supabase } from '@/lib/initSupabase';
import { useAuth } from '@/components/authProvider';
import Layout, { useBooks } from '@/components/dashboard/layout';
import { useRouter } from 'next/router';

export default function Page() {
  const [pdf, setPdf] = useState<any>(null);
  const router = useRouter();
  const [bookNamespace, setBookNamespace] = useState<string>('');
  const [ready, setReady] = useState<any>(false);
  const [text, setText] = useState<string>('Hi, upload your textbook!');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const { user } = useAuth();
  const { setBooks, setActiveChat, activeChat } = useBooks();
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
  }>({
    messages: [
      {
        message: text, //adjust this as needed
        type: 'apiMessage',
      },
    ],
    history: [],
  });

  useEffect(() => {
    setActiveChat('');
  }, [setActiveChat]);

  useEffect(() => {
    setActiveChat('');
  }, [setActiveChat]);

  useEffect(() => {
    if (activeChat == '') {
      setLoading(true);
      setPdf(null);
      setReady(null);
      setMessageState({
        messages: [
          {
            message: 'Hi, upload your textbook!',
            type: 'apiMessage',
          },
        ],
        history: [],
      });
    }
  }, [activeChat]);

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<any>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPdf(selectedFile);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    if (!pdf) {
      return;
    }

    if (pdf) {
      try {
        setReady(true);
        setLoading(true);

        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'userMessage',
              message: pdf.name,
            },
          ],
        }));

        setTimeout(() => {
          setMessageState((state) => ({
            ...state,
            messages: [
              ...state.messages,
              {
                type: 'apiMessage',
                message: 'Thank you! Let me process this.',
              },
            ],
            history: [...state.history],
          }));
        }, 2000);

        const { data: bookData, error: bookError } = await supabase
          .from('books')
          .insert([{ title: pdf.name, user_id: user.id }])
          .select();

        if (!bookData) {
          setError(bookError);
          return;
        }

        const { data, error } = await supabase.storage
          .from('pdfs')
          .upload(`public/${bookData[0].namespace}.pdf`, pdf, {
            contentType: 'application/pdf',
          });

        if (error) {
          const { data: deleteData, error: deleteError } = await supabase
            .from('books')
            .delete()
            .eq('namespace', bookData[0].namespace);
          setError(error.message);
          return;
        }

        const { data: msgData, error: msgError } = await supabase
        .from('messages')
        .insert({
          message: pdf.name,
          type: 'userMessage',
          book_namespace: bookData[0].namespace,
        });

      setBooks((state: any) => [bookData[0], ...state]);

      await supabase.from('messages').insert({
        message: 'Thank you! Let me process this.',
        type: 'apiMessage',
        book_namespace: bookData[0].namespace,
      });

      
      const pdfProcessResponse = await fetch('https://6og8a1e02b.execute-api.us-east-2.amazonaws.com/production/processPdfs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookNamespace: bookData[0].namespace,
          api: process.env.NEXT_PUBLIC_API_KEY
        }),
      });

      const pdfProcessData = await pdfProcessResponse.json();


        if (pdfProcessData.statusCode == '200') {
          setReady(true);
          console.log('PDF uploaded successfully & Ingested');
        } else {
          setError(pdfProcessData.body);
          return;
        }

        setBookNamespace(bookData[0].namespace);
        setActiveChat(bookData[0].namespace);

      await supabase.from('messages').insert({
        message: 'Please wait 5 seconds for model intiation.',
        type: 'apiMessage',
        book_namespace: bookData[0].namespace,
      });

      setMessageState((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'apiMessage',
            message: 'Please wait 5 seconds for model intiation.',
          },
        ],
        history: [...state.history],
      }))

      setTimeout(async() => {
        setLoading(false)
        await supabase.from('messages').insert({
          message: 'What questions do you have?',
          type: 'apiMessage',
          book_namespace: bookData[0].namespace,
        });
  
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: 'What questions do you have?',
            },
          ],
          history: [...state.history],
        }));
  
      },5000)
 



      } catch (error) {
        setError('An error occurred while processing the file.');
        console.log('File Processing Error:', error);
      }
    }
  };

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

    await supabase.from('messages').insert({
      message: question,
      type: 'userMessage',
      book_namespace: bookNamespace,
    });

    setLoading(true);
    textAreaRef.current.value = '';

          
    try {
      const response = await fetch('https://6mzc75j4vc.execute-api.us-east-2.amazonaws.com/production/chat-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
          bookNamespace,
          api: process.env.NEXT_PUBLIC_API_KEY
        }),
      });
      const initialData = await response.json();
      const data = JSON.parse(initialData.body);

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

        await supabase.from('messages').insert({
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
      <div className="mx-auto flex flex-col gap-4">
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
              {!ready && (
                <>
                  <form onSubmit={handleFormSubmit}>
                    <textarea
                      disabled={true}
                      onKeyDown={handleEnter}
                      ref={textAreaRef}
                      autoFocus={false}
                      rows={1}
                      maxLength={512}
                      id="userInput"
                      name="userInput"
                      placeholder={!pdf ? 'No file is selected' : pdf.name}
                      className={`relative resize-none text-lg pl-16 p-4 w-[75vw] rounded-md bg-white text-black outline-none border`}
                    />
                    <button type="submit" className={styles.generatebutton}>
                      <svg
                        className={`${styles.svgicon}  `}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </button>
                  </form>
                  <div
                    className={`${styles.wrapper} absolute -mt-[3.8rem] ml-2 `}
                  >
                    <div className={styles.fileUpload}>
                      <input
                        type="file"
                        accept=".pdf"
                        id="fileInput"
                        onChange={handleFileUpload}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                  </div>
                </>
              )}
              {ready && (
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
                      loading
                        ? 'Waiting for response...'
                        : 'Enter a prompt here' //I just changed this here, but you can update it accordingly
                    }
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
              )}
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
