import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/log-in",
  "/sign-up",
  "/api/uplodathing",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
