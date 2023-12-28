# Live: https://scholarly-llama.vercel.app
# Scholarly Llama: Accessible Education with LLMS

Scope of this project: Scholarly Llama is a project developed with the goal of providing accessible education using Large Language Modeling System (LLMS). This is done by allowing users to upload textbooks or books and then creating and serving models out of them. These models are able to be used without any friction, users can even leave and come back on another device and be assured that their previous chat history will be there.

### Main Features

#### Homepage with texbook options 📚
- Users upload their own textbooks to be made into LLMS, how this works: The PDFs the users upload are ingested into pinecone, the ingestion process first involves parsing the pdf into text and then splitting that text. Afterward we utilize langchain/openais embedding feature to create embeddings of the text and store them as vectors into pinecone. Finally, whenever the user sends a prompt, we search through the vectors and use the prompt as a basis, thus returning the answer.
  
#### Authentication and user management 🔑
- Allow users to log in/signup using their Google credentials for a seamless experience, with sessions, and protected routes.

#### Theme Customization 🌙
- Dark/Light Mode options for user preferences in order to enhance the visual experience.

#### Test Section 📝
- A testing feature where users can be evaluated on certain chapters. The system generates questions, and the correct answers are instantly provided, offering immediate feedback to enhance the learning process.

![homepage](https://github.com/DeveloperMindset123/Scholarly-Llama/assets/39009375/34104078-a5a3-43b6-ba0b-e9ce1c5a7307)

![transfer](https://github.com/DeveloperMindset123/Scholarly-Llama/assets/39009375/dd449ad0-fb2d-4a67-a921-35b4dd7d8df1)

![chats](https://github.com/DeveloperMindset123/Scholarly-Llama/assets/39009375/cfa8fca2-5f77-43f7-b201-df1bfa8fbfca)
