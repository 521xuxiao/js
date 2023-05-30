<script>
import { getFragmentObject } from '@/utils'

export default {
  name: 'AuthRedirect',
  created() {
    const { access_token } = getFragmentObject()
    if (access_token) {
      this.$store.dispatch('user/setToken', access_token)
      this.$router.push('/')
    } else {
      this.$router.push('/')
    }
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
