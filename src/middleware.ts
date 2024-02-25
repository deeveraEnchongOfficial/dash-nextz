import { NextResponse } from 'next/server';
// import isAuth from '@/utils/isAuthenticatedMiddleware';

export async function middleware(request: any) {

    // use the isAuth function to check if the user is authenticated
    // const isAuthenticated = await isAuth();

    // console.log('isAuthenticated:', isAuthenticated);

    // Define paths that do not require authentication
    // const openPaths = ['/', '/auth/signin', '/auth/signup'];

    // const url = new URL(request.url);

    // If the user is authenticated but trying to access sign-in or sign-up pages, redirect them to the dashboard
    // if (true && (url.pathname === '/auth/signin' || url.pathname === '/auth/signup')) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    // Check if the request is for a page that does not require authentication
    // if (openPaths.includes(url.pathname)) {
    //     // Allow the request to proceed as normal for open paths
    //     return NextResponse.next();
    // }

    // For all other paths, check if the user is authenticated
    // if (!true) {
    //     // Redirect unauthenticated users to the login page
    //     return NextResponse.redirect(new URL('/auth/signin', request.url));
    // }

    // Allow the request to proceed for authenticated users
    return NextResponse.next();
}

// Apply middleware to all pages while aiming to exclude explicitly open paths
// However, explicit exclusions in the matcher config aren't supported directly
// This configuration applies the middleware broadly, and logic within handles exclusions
// export const config = {
//     matcher: ['/dashboard/:path*'], // Apply middleware to all paths to enforce the check globally
// };
