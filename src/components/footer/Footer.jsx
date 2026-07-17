import './footer.css'

function Footer () {
    const links= [
        {'link': 'https://www.instagram.com/', 'title': 'Instagram', 'position':'0'},
        {'link': 'https://x.com/?lang=uk', 'title': 'Twiter', 'position':'58px'},
        {'link': 'https://www.youtube.com/', 'title': 'YooTube', 'position':'20px'},
    ]
    return (
        <footer>
            {links.map((link, index) =>(
                <a key={index} href={link.link} className='footer-link' style={{backgroundPositionX: `${link.position}`}}></a>
            ))}
        </footer>
    )
}

export default Footer