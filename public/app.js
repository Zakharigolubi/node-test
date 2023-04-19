document.addEventListener('click', (e) => {
  const id = e.target.dataset.id
  if (e.target.dataset.type === 'remove') {
    remove(id).then(() => {
      e.target.closest('li').remove()
    })
  }
  if (e.target.dataset.type === 'edit') {
    const title = e.target.closest('li').children[0].textContent
    const newTitle = prompt('Enter new title', title)
    if (newTitle !== title && newTitle !== '' && newTitle !== null) {
      edit({ title: newTitle, id: id }).then(() => {
        e.target.closest('li').children[0].innerHTML = newTitle
      })
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(data) {
  await fetch(JSON.stringify(data), { method: 'PUT' })
}
