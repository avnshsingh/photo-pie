# Photo Pie

This app let your upload photos and you can view it in pinterest like format

## Tech Stack

**Client:** React, TailwindCSS, Daisy UI, Tanstack Query, Typescript

**Server:** Node, Express, MongoDB, Cloudinary, Typescript

Follwed MVC pattern for Backend to make code well structured

## Demo
[Demo Video](https://www.loom.com/share/91591558d7f7493b8bdfb37f4ff8373b?sid=9d22d807-5ae4-4f12-a39f-53cd22826e2a)

![image](https://github.com/user-attachments/assets/44c41373-b484-4932-b67f-c859b2868473)
![image](https://github.com/user-attachments/assets/b7413cda-9945-4502-b9b7-077530f7cb71)

## Run Locally

Clone the project

```bash
  git clone https://github.com/avnshsingh/photo-pie.git
```

### Run Backend

Go to the **backend** project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Add environment variable in .ENV file

```JSON
MONGO_URI
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

Start the server

```bash
  npm run start
```

### Run Frontend

Now go to the **frontend** project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
