<template>
  <div>
    init app
    <v-btn @click="addUser">add user</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { v4 as uuid } from 'uuid'

export default {
  methods: {
    ...mapActions({
      addUserAction: 'users/add',
    }),
    async addUser() {
      const doc = {
        name: 'name:' + uuid(),
        favorite: 'favorite:' + uuid(),
      }

      await this.addUserAction({ doc })
    },
  },
}
</script>
