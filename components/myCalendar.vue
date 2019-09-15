<template>
  <v-App v-cloak id="dayspan">
    <ds-calendar-App ref="App"
                     :calendar="calendar"
                     :read-only="readOnly"
                     @change="updateEvent"
    >
      <template slot="title">
        Calendar @ Léo
      </template>
      <template slot="eventPopover" slot-scope="slotData">
        <ds-calendar-event-popover
          v-bind="slotData"
          :read-only="readOnly"
          @finish="updateEvent"
        />
      </template>
      <template slot="eventCreatePopover" slot-scope="{placeholder, calendar}">
        <ds-calendar-event-create-popover
          :calendar-event="placeholder"
          :calendar="calendar"
          :close="$refs.App.$refs.calendar.clearPlaceholder"
          @create-edit="$refs.App.editPlaceholder"
          @create-popover-closed="createEvent"
        />
      </template>
      <template slot="eventTimeTitle" slot-scope="{calendarEvent, details}">
        <div>
          <v-icon
            v-if="details.icon"
            class="ds-ev-icon"
            size="14"
            :style="{color: details.forecolor}"
          >
            {{ details.icon }}
          </v-icon>
          <strong class="ds-ev-title">{{ details.title }}</strong>
        </div>
        <div class="ds-ev-description">
          {{ getCalendarTime( calendarEvent ) }}
        </div>
      </template>
      <template slot="drawerBottom">
        <div class="pa-3">
          <v-checkbox
            v-model="readOnly"
            label="Read Only?"
          />
        </div>
        <div class="pa-3">
          <h2> Users </h2>
          <b-field>
            <b-input v-model="createUser" placeholder="Lowik" @keyup.enter="addUser" />
            <p class="control">
              <button class="button is-primary" @click="addUser">
                add
              </button>
            </p>
          </b-field>
          <div v-for="user in users" :key="user.name" class="columns">
            <div class="column is-three-quarters">
              <v-checkbox
                v-model="user.display"
                :label="user.name"
                @click="updateUser(user)"
              />
            </div>
            <div class="column is-one-quarter">
              <b-button class="button is-primary" @click="deleteUser(user.name)">
                X
              </b-button>
            </div>
          </div>
        </div>
      </template>
    </ds-calendar-App>
  </v-App>
</template>

<script>
import { Calendar } from 'dayspan'
export default {
  name: 'App',

  components: {
  },

  props: {
    users: {
      required: true,
      type: Array
    },
    events: {
      required: true,
      type: Array
    }
  },

  data: () => ({
    calendar: Calendar.weeks(),
    readOnly: false,
    createUser: ''
  }),

  mounted () {
    window.App = this.$refs.App
    this.updateCalendar()
  },

  updated () {
    this.updateCalendar()
  },
  methods: {
    isSameData (old, updt) {
      if (
        old.busy !== updt.busy ||
        old.calendar !== updt.calendar ||
        old.color !== updt.color ||
        old.description !== updt.description ||
        old.forecolor !== updt.forecolor ||
        old.icon !== updt.icon ||
        old.location !== updt.location ||
        old.title !== updt.title
      ) {
        return false
      }
      return true
    },
    isSameSchedule (old, updt) {
      if (
        old.dayOfMonth !== updt.dayOfMonth ||
        old.month !== updt.month ||
        old.times !== updt.times ||
        old.year !== updt.year
      ) {
        return false
      }
      return true
    },
    updateCalendar () {
      this.calendar.events = []
      this.events.forEach((element) => {
        if (this.isDisplayable(element.data.calendar)) {
          this.calendar.events.push(element)
        }
      })
      this.$refs.App.setState(this.calendar)
    },
    isDisplayable (calName) {
      for (let index = 0; index < this.users.length; index++) {
        if (
          this.users[index].name === calName &&
          this.users[index].display === false
        ) {
          return false
        }
      }
      return true
    },
    addUser () {
      this.$store.dispatch('users/createUser', { name: this.createUser })
    },

    deleteUser (user) {
      this.$store.dispatch('users/deleteUser', user)
    },

    updateUser (user) {
      this.$store.dispatch('users/updateUser', user)
    },

    getCalendarTime (calendarEvent) {
      const sa = calendarEvent.start.format('a')
      const ea = calendarEvent.end.format('a')
      let sh = calendarEvent.start.format('h')
      let eh = calendarEvent.end.format('h')
      if (calendarEvent.start.minute !== 0) {
        sh += calendarEvent.start.format(':mm')
      }
      if (calendarEvent.end.minute !== 0) {
        eh += calendarEvent.end.format(':mm')
      }
      return sa === ea ? sh + ' - ' + eh + ea : sh + sa + ' - ' + eh + ea
    },
    createEvent () {
      const state = this.calendar
      const stateIn = this.calendar.toInput(true)
      for (let index = 0; index < state.events.length; index++) {
        if (this.events.length === 0 || index >= this.events.length) {
          this.$store.dispatch('event/createEvent', stateIn.events[index])
        }
      }
    },
    updateEvent () {
      const old = []
      this.events.forEach((element) => {
        if (this.isDisplayable(element.data.calendar)) {
          old.push(element)
        }
      })
      const updt = this.calendar.toInput(true).events
      for (let index = 0; index < updt.length; index++) {
        if (
          !this.isSameData(old[index].data, updt[index].data) ||
          !this.isSameSchedule(old[index].schedule, updt[index].schedule)
        ) {
          updt[index]._id = old[index]._id
          this.$store.dispatch('event/updateEvent', updt[index])
        }
        this.$store.dispatch('event/updateEvent', updt)
      }
    }
  }
}
</script>

<style>
body,
html,
#App,
#dayspan {
  font-family: Roboto, sans-serif !important;
  width: 100%;
  height: 100%;
}
.ds-calendar-event .hide {
  display: none;
}
.v-btn--flat,
.v-text-field--solo .v-input__slot {
  background-color: #f5f5f5 !important;
  margin-bottom: 8px !important;
}
</style>
