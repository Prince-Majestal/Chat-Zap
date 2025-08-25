function NavBar(props) {


    return (

        <header className= "flex justify-between items-center p-4 bg-gray-800">
            <h3 className= "text-2xl text-yellow-400"><strong>Welcome to Chat-Zap!</strong></h3>

            <p className= "text-white">Status: {props.status}</p>
        
        </header>

    )
   
}

export default NavBar