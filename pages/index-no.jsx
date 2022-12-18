import SideBar from '../components/sideBar/sideBar.component';
import ActionPanel from '../components/actionPanel/actionPanel.component';
import ViewPanel from '../components/viewPanel/viewPanel.component';
import Title from '../components/title/title.component'
import MainButton from '../components/mainButton/mainButton.component';
import Link from 'next/link';

function HomePage() {
    return  <section className='App' >
                <SideBar />
                <Link href='dashboard' >Log In</Link>
            </section>
  }
  
  export default HomePage