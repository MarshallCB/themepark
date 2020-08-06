export default (html) => {
  let localComponent = (text) => html`
    <h2>I'm a component, baby</h2>
    <p>${text}</p>
  `

  return html`
    <div class="card">
      <p>Example text</p>
      ${ localComponent("Hello component") }
    </div>
  `
}