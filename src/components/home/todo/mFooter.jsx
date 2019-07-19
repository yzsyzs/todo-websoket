import '@/assets/css/footer.scss'

export default {
  data () {
    return {
      author: 'YuShuangCheng',
      footer: 'footer'
    }
  },
  render () {
    return (
      <div id={this.footer}>The Written {this.author}</div>
    )
  }
}
