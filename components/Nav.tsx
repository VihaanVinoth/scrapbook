import Link from "next/link";

function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="/post">Post</Link>
      <Link href="/about">About</Link>
      <Link href="/signin">Sign in</Link>
    </nav>
  );
}

export default Nav;
