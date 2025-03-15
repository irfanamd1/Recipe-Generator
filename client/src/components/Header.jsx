import { UserButton } from '@clerk/clerk-react'
import chefLogo from '../assets/chef-icon.png'

export default function Header() {
	return (
		<header className='header'>
			<div className='brand-container'>
				<img className='logo' src={chefLogo} alt="Chefzia Logo" />
				<h1 className='brand'>Chefzia</h1>
			</div>
			<div className='profile'>
				<UserButton />
			</div>
		</header>
	)
}
