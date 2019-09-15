<template>
  <section>
    <myCalendar :users="users" :events="events" />
  </section>
</template>

<script>
import myCalendar from '~/components/myCalendar'
export default {
  components: {
    myCalendar
  },

  computed: {
    users () {
      return this.$store.state.users.users || []
    },
    events () {
      return this.$store.state.event.events
        ? this.$store.state.event.events
        : []
    }
  }
}
</script>
