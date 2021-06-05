import {useState} from 'react'
import {useHistory} from 'react-router-dom'
const Create = () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('Mahir')
    const [isPending, setisPending] = useState(false)
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        const blog = { title, body, author }
        
        setisPending(true)
        fetch('http://localhost:8000/blogs', {
            method : 'POST',
            headers: {"Content-Type" : "application/json" },
            body : JSON.stringify(blog)
        }).then ( () => {
            console.log('new blog added');
            setisPending(false)
            // history.go(-1)
            history.push('/')
        })
    }
    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit = { handleSubmit }>
                <label> Blog title: </label>
                <input type="text"
                       required 
                       value= {title}
                       onChange = {(e) => setTitle(e.target.value)}
                />
                <label> Blog body: </label>
                <textarea 
                required
                value = {body}
                onChange = { (e) => setBody(e.currentTarget.value) }
                >    
                </textarea>
                <label> Blog author: </label>
                <select
                value = {author}
                onChange = { (e) => setAuthor(e.target.value)}
                >
                    <option value="Mahir">Mahir</option>
                    <option value="Rijwan">Rijwan</option>
                    <option value="Sk">Sk</option>
                    <option value="Timir">Timir</option>
                </select>
                { !isPending && <button >Add blog</button> }
                { isPending && <button disabled >Adding blog... </button> }
               
            </form>
        </div>
     );
}
 
export default Create;