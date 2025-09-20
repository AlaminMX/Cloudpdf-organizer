import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

window.supabase = createClient("https://yyytlovazevvbugxmqhx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eXRsb3ZhemV2dmJ1Z3htcWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTE3NzcsImV4cCI6MjA3MzkyNzc3N30.F76gfo1WS5OgPZ3sDm9jvLh_rb2wdPnqbchCzqkpneg");

document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const signOutBtn = document.getElementById('sign-out-btn');
    const errorMessage = document.getElementById('error-message');

    const { data: { user } } = await window.supabase.auth.getUser();
    const currentPath = window.location.pathname;

    // Route protection
    const protectedPages = ['/index.html', '/'];
    if (protectedPages.includes(currentPath) && !user) {
        window.location.href = 'login.html';
        return;
    }

    // Redirect logged-in users from login/signup pages
    const publicPages = ['/login.html', '/signup.html'];
    if (publicPages.includes(currentPath) && user) {
        window.location.href = 'index.html';
        return;
    }

    const showError = (message) => {
        if (errorMessage) {
            errorMessage.innerText = message;
            errorMessage.style.display = 'block';
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (errorMessage) errorMessage.style.display = 'none';
            const email = e.target.email.value;
            const password = e.target.password.value;
            
            const { data, error } = await window.supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if(error) {
                showError(error.message);
                return;
            }
            
            console.log('Logging in with:', email);
            // Redirect to dashboard on successful login
            window.location.href = 'index.html';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (errorMessage) errorMessage.style.display = 'none';
            const email = e.target.email.value;
            const password = e.target.password.value;
            const confirmPassword = e.target['confirm-password'].value;
            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }
            
            const { data, error } = await window.supabase.auth.signUp({
                email: email,
                password: password,
            })

            if(error) {
                showError(error.message);
                return;
            }

            console.log('Signing up with:', email);
            // Redirect to dashboard on successful signup
            window.location.href = 'index.html';
        });
    }

    if (signOutBtn) {
        signOutBtn.addEventListener('click', async () => {
            const { error } = await window.supabase.auth.signOut();
            if (error) {
                showError(error.message);
                return;
            }
            window.location.href = 'login.html';
        });
    }
});
