

function sidebar(sidebarData) {
  
  console.log(sidebarData)
  
  return (`
		<div class="container">
			<h1>Sidebar</h1>
			${Object.keys(sidebarData).map(catName=>(
			  `<div>
          <h4>${catName}</h4>
          <div>
            ${sidebarData[catName] && sidebarData[catName].map(post=>(
              `<div>
                <a href="/${post.category_slug}/${post.slug}">${post.slug}</a>
              </div>
              `
            ))}
          </div>
        </div>`
      ))}
		</div>
	`)
}

export default sidebar