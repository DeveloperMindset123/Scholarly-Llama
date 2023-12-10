# Scholarly Llama: Accessible Education with LLMS

Scope of this project: Llama learn is a project developed for the Llama Hackhathon with the goal of providing accessible education using Large Language Modeling System (LLMS). The primary focus is on creating a Minimum Viable Product (MVP) with additional features to enhance the learning experience.

### MVP Features
#### Authentication and user management 🔑🔐🆔🗝️🏧🔒🔓🔏
- Implemented with Supabase allowing users to log in/signup using their Google credentials for a seamless experience.

#### Dynamic Header ‼️
- Features a dynamic header providing various information to enhance user engagement and navigation.

#### Theme Customization 🌙 ☀️
- Dark/Light Mode options for user preferences in order to enhance the visual experience.

### Potential Features
#### Homepage with texbook options 📚
- Users can upload their own textbooks. The PDFs are stored in Supabase and ingested into pinecone, utilizing different namespaces for each user This feature enables users to interact with chatbots specific to their uploaded textbooks.

#### Test Section 📝
- A testing feature where users can be evaluated on certain chapters. The system generates questions, and the correct answers are instantly provided, offering immediate feedback to enhance the learning process.

[comment]: <> (This is the part that I copied) 
### Getting Started
1. Clone the repository or download the zip
   `git clone https://github.com/DeveloperMindset123/Scholarly-Llama.git` || `git clone [github https url]`  (note: the URL will be different if you happened to have forked the repository)

2. Install packages
   First run `npm install yarn -g` to install yarn globally (assuming you don't have yarn installed)

   Then run:
   `yarn install`

   or simply type: (whichever you prefer using)
   `npm install`
   
After installation you should see a node_modules folder.
3. Set up your `.env` file (simply create a new file on the root of the project named .env will be sufficient)
- copy `.env example` into `.env` and your `.env` file should look like this:
   
```
   OPENAI_API_KEY=
   PINECONE_API_KEY=
   PINECONE_ENVIRONMENT=
   PINECONE_INDEX_NAME=
```

- Visit [openai](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) to retrieve API keys and insert into your `.env` file.
- Visit [pinecone](https://pinecone.io/) to create and retrieve your API keys, and also retrieve your environment and index name from the dashboard.

4. In the `config` folder, replace the `PINECONE_NAME_SPACE` with a `namespace` where you'd like to store your embeddings on Pinecone when you run `npm run ingest`. This namespace will later be used for queries and retrieval.
5. In `utils/makechain.ts` chain change the `QA_PROMPT` for your own usecase. Change `modelName` in `new OpenAI` to `gpt-4`, if you have access to `gpt-4` api. Please verify outside this repo that you have access to `gpt-4` api, otherwise the application will not work.
  
## Convert your PDF files to embeddings

**This repo can load multiple PDF files**

1. Inside `docs` folder, add your pdf files or folders that contain pdf files.

2. Run the script `yarn run ingest` to 'ingest' and embed your docs. If you run into errors troubleshoot below.

3. Check Pinecone dashboard to verify your namespace and vectors have been added.

## Run the app

Once you've verified that the embeddings and content have been successfully added to your Pinecone, you can run the app `npm run dev` to launch the local dev environment, and then type a question in the chat interface.

## Troubleshooting

In general, keep an eye out in the `issues` and `discussions` section of this repo for solutions.

**General errors**

- Make sure you're running the latest Node version. Run `node -v`
- Try a different PDF or convert your PDF to text first. It's possible your PDF is corrupted, scanned, or requires OCR to convert to text.
- `Console.log` the `env` variables and make sure they are exposed.
- Make sure you're using the same versions of LangChain and Pinecone as this repo.
- Check that you've created an `.env` file that contains your valid (and working) API keys, environment and index name.
- If you change `modelName` in `OpenAI`, make sure you have access to the api for the appropriate model.
- Make sure you have enough OpenAI credits and a valid card on your billings account.
- Check that you don't have multiple OPENAPI keys in your global environment. If you do, the local `env` file from the project will be overwritten by systems `env` variable.
- Try to hard code your API keys into the `process.env` variables if there are still issues.

**Pinecone errors**

- Make sure your pinecone dashboard `environment` and `index` matches the one in the `pinecone.ts` and `.env` files.
- Check that you've set the vector dimensions to `1536`.
- Make sure your pinecone namespace is in lowercase.
- Pinecone indexes of users on the Starter(free) plan are deleted after 7 days of inactivity. To prevent this, send an API request to Pinecone to reset the counter before 7 days.
- Retry from scratch with a new Pinecone project, index, and cloned repo.

