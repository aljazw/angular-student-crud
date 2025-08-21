# Student Management App (Angular)

This project is a **simple Angular application** for managing students. It connects to a JSON Server backend to store and retrieve student data.

## ✨ Features

- **Dashboard**: Overview of all students in a table view
- **Add, Edit & Delete Students** functionality
- **Lazy Loading** applied to both the student table and individual pages
- **Theme Switching**: Light/Dark mode support with persistence

## 🛠️ Tech Stack

- [Angular](https://angular.io/) – Frontend framework
- [PrimeNG](https://primeng.org/) – UI components & theming
- JSON Server – Mock backend / REST API
- TypeScript
- HTML / SCSS

## 📂 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/student-management.git
cd student-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a file `src/environments/environment.ts` and add the following configuration:

```ts
export const environment = {
    apiUrl: "http://localhost:3000",
};
```

### 4. Generate Mock Database

You can generate a mock `db.json` file with a custom number of students using the Node script:

```bash
node generate-db.js 500
```

- `500` is the number of students to generate (you can replace it with any number you need).
- This will create/update db.json file.

### 5. Launch Mock Backend

Run the following command to start a JSON Server for your mock database:

```bash
npx json-server --watch db.json --port 3000
```

### 6. Run the development server

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🤝 Contributing

This is a mock project, but contributions, suggestions, and improvements are welcome. Feel free to fork, pull, or experiment with it.

## 📄 License

_This project is licensed under the [MIT License](LICENSE)._
