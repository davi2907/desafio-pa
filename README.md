# How to run this React + TypeScript + Vite project

## Step 1: Install Git to clone the project

#### Windows:
- Install Git in the official site: https://git-scm.com/
- Accept all standards options.

#### Linux (Debian/Ubunto):
Run the following command in the terminal:
```bash
sudo apt install git
```

#### MacOS:
Run the following command in the terminal:
```bash
brew install git
```


## Step 2: Clone Project:
Run the following command in the terminal replacing what is in parentheses with the github repository::
```bash
git clone (link of the github repository)
cd repository-name
```

## Step 3: Install npm (Node Package Modules):

#### Windows:
- Go to official site and install LTS version: https://nodejs.org

#### Linux (Ubunto/Debian):
Run the following command in the terminal:
```bash
sudo apt install nodejs npm
```

#### MacOS:
Run the following command in the terminal:
```bash
brew install node
```

## Step 4: Install Dependencies
Open the project and run the following commands in the terminal:
```bash
npm install
npm install tailwindcss @tailwindcss/vite
npm run dev
```

## Step 5: Now you can use!
Just run the local server on a browser and use it.

## Important Observation
You need to get an API key from TMDb to use it. If you have one, create a file in root named ".env" and add this there:
VITE_TMDB_TOKEN=Bearer YourKeyToken
