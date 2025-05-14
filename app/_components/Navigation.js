import { auth } from '../_lib/auth';
import MenuClient from './MenuClient';

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 relative">
      <MenuClient session={session} />
    </nav>
  );
}
