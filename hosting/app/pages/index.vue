<template>
  <div>
    <v-row class="ma-4">
      <v-col cols="6">
        <v-btn @click="addUser">add user</v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field label="検索" outlined dense @change="search" />
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="6">
        <v-card v-if="userList.length">
          <v-list>
            userList
            <template v-for="user in userList">
              <v-list-item :key="'item:' + user.id">
                <div>
                  ID: {{ user.id }}
                  <br />
                  name: {{ user.name }}
                  <br />
                  favorite: {{ user.favorite }}
                </div>
              </v-list-item>
              <v-divider :key="'divider:' + user.id" />
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card v-if="searchList.length">
          <v-list>
            searchList
            <template v-for="user in searchList">
              <v-list-item :key="'item:' + user.objectID">
                <div>
                  ID: {{ user.objectID }}
                  <br />
                  name: {{ user.name }}
                  <br />
                  favorite: {{ user.favorite }}
                </div>
              </v-list-item>
              <v-divider :key="'divider:' + user.objectID" />
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      searchList: [],
    }
  },
  computed: {
    ...mapGetters({
      userList: 'users/list',
    }),
  },
  created() {
    this.setListRefAction()
  },
  methods: {
    ...mapActions({
      addUserAction: 'users/add',
      searchAction: 'users/search',
      setListRefAction: 'users/setListRef',
    }),
    async addUser() {
      const name = prompt('name', '')
      const favorite = prompt('favorite', '')
      const doc = {
        name,
        favorite,
      }
      await this.addUserAction({ doc })
    },
    async search(query) {
      const { hits, ...res } = await this.searchAction({ query })
      console.log('hits: ', hits)
      console.log('res: ', res)
      this.searchList = hits
    },
  },
}
</script>
