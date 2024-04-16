import { useEffect, useState } from 'react'
import users from "./data.json"
import "./App.css"


const Tag = ({text, setAllTags}) => {

  return <span className='tag' onClick={()=>{
    setAllTags(p=>{
      return p.includes(text) ? p : [...p, text]
    })
  }}>
    {text}
  </span>
}

const Job = ({data, setAllTags}) => 
{

  return(
  <div className={`user ${data.featured ? "featured":""}`}>
      <div className="left">
        <img src={data.logo} alt="" />

    
      </div>
      <div className="middle">
        <div className='middle-top'>
          <h3 className='company-name'>{data.company}
          </h3>
          {data.featured?<div className='featured-tag t-tags'>FEATURED</div>:""}
          {data.new?<div className='new-tag t-tags'>NEW!</div>:""}
        </div>
        <div className='position'>{data.position}</div>
        <div className='job-info'>
          <span>{data.postedAt}</span>
          <span className='center-dot'></span>
          <span>{data.contract}</span>
          <span className='center-dot'></span>
          <span>{data.location}</span>
        </div>
      </div>
      <hr/>
      <div className="right">
        {data.languages.map(language => 
          <Tag text={language} setAllTags={setAllTags} />
        )}  
      </div>
  </div>)
}

const JobListings = ({setAllTags, allTags}) => {

    const [jobs, setJobs] = useState([])

    useEffect(() => { 
      setJobs( p => {
        if(allTags.length > 0){
        let arr = []
        for(let user of users){
          let b = false
          for(let language of user.languages){
            if(allTags.includes(language))
              b= true
          }
          if(b)
            arr.push(user)
        }
        return arr;
      }
      else {return users}
    }
      )
    }, [allTags])
      
    return (
      <div>
        {jobs.map(user => <Job data={user} setAllTags={setAllTags}/>)}
      </div>
    );
}

const Footer = () => {
 return <footer>
    <p>
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
    Coded by Alexandr Vorotnikov.
    </p>
  </footer>
}

const App = () => {
  const [allTags, setAllTags] = useState([])

  console.log(users[0])
  return <div
    style={{paddingBottom:"4rem", minHeight: "100vh"}}
  >
    
      <header>

      </header>

   { allTags.length > 0 &&  <div className='tags'>
      <div className='tags-content'>
        {
          allTags.map((tag,index) => <div
          className='main-tags'
            onClick={() => {
              setAllTags(p => p.filter((p, id) => id != index))
            }}
          >
              <div>{tag}</div>
              <div>&#10005;</div>
            </div>
            )
        }
        
      </div>
      <h3 className='clear-btn'
        onClick={() => {setAllTags([])}}
      >Clear </h3> 
    </div>
  }
      <JobListings setAllTags={setAllTags} allTags={allTags}/>
      
      <Footer />
  </div>
}

export default App
