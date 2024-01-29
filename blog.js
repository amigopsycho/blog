// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to set up UI based on user authentication status
function setupUI(user) {
    const authContainer = document.getElementById('auth-container');
    if (user) {
        // User is signed in, show logout button
        authContainer.innerHTML = `
            <button id="logoutBtn">Logout</button>
        `;
        // Handle logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            firebase.auth().signOut();
        });
    } else {
        // User is not signed in, show login button
        authContainer.innerHTML = `
            <button id="loginBtn">Login</button>
        `;
        // Handle login
        document.getElementById('loginBtn').addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    console.log('Signed in as', result.user.displayName);
                })
                .catch((error) => {
                    console.error('Authentication failed:', error);
                });
        });
    }
}

// Listen for changes in authentication state
firebase.auth().onAuthStateChanged((user) => {
    setupUI(user);
});
