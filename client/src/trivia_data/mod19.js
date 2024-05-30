[
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Web Development",
      "question": "What does PWA stand for?",
      "correct_answer": "Progressive Web Application",
      "incorrect_answers": ["Practical Web Application", "Proactive Web Application", "Public Web Application"]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Web Development",
      "question": "Which file is essential for a web app to be considered a PWA?",
      "correct_answer": "manifest.json",
      "incorrect_answers": ["serviceworker.js", "index.html", "app.js"]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Web Development",
      "question": "What is the purpose of a service worker in a PWA?",
      "correct_answer": "To handle caching and enable offline functionality.",
      "incorrect_answers": ["To manage server-side rendering.", "To optimize images and other assets.", "To handle form submissions."]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Web Development",
      "question": "How do you register a service worker in a PWA?",
      "correct_answer": "navigator.serviceWorker.register('/serviceworker.js')",
      "incorrect_answers": ["navigator.worker.register('/serviceworker.js')", "navigator.serviceWorker.register('serviceworker.js')", "window.serviceWorker.register('/serviceworker.js')"]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Web Development",
      "question": "What is the primary purpose of the manifest.json file in a PWA?",
      "correct_answer": "To provide metadata about the web app, such as its name, icons, and start URL.",
      "incorrect_answers": ["To configure the service worker.", "To define the app's routes and components.", "To store user preferences and settings."]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Web Development",
      "question": "What is the main advantage of using Vite for building PWAs?",
      "correct_answer": "It provides fast build times and an optimized development experience.",
      "incorrect_answers": ["It supports all web frameworks.", "It automatically registers service workers.", "It provides built-in authentication."]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "Which method is used to cache assets in a service worker?",
      "correct_answer": "caches.open().then(cache => cache.addAll())",
      "incorrect_answers": ["cache.open().then(c => c.addAll())", "caches.create().then(cache => cache.add())", "cache.addAll()"]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "How can you ensure that a PWA is installable on a user's device?",
      "correct_answer": "By providing a valid manifest.json and a service worker with a fetch event handler.",
      "incorrect_answers": ["By using React or Angular.", "By registering a service worker only.", "By hosting the app on a secure server."]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "What is the purpose of the 'install' event in a service worker?",
      "correct_answer": "To handle initial caching of assets.",
      "incorrect_answers": ["To manage updates to the service worker.", "To handle push notifications.", "To sync data with the server."]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "Which API is commonly used in PWAs to show notifications?",
      "correct_answer": "Notifications API",
      "incorrect_answers": ["Push API", "Alerts API", "Messages API"]
    }
  ]
  