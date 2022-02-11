<template>
  <q-page class="row  justify-evenly">
    <div>

      length: {{ cube.length }}
      width:  {{ cube.width }}
      height: {{ cube.height }}

      <br>
      length From ToRef() : {{ lengthFromToRef }}

      <br>
      toRefs():
      l - {{ length }}
      w - {{ width }}
      h - {{ height }}

      <br>
      testing customRef
      {{ test }}
      <button @click="change">Press Me</button>

      <h6 class="text-center">Online Jobs</h6>
      <div class="order q-gutter-x-xs text-center">
        <q-btn label="Order by title" @click="handleClick('title')" />
        <q-btn label="Order by salary" @click="handleClick('salary')" />
        <q-btn label="Order by location" @click="handleClick('location')" />
      </div>

      <JobList :jobs="jobs" :order="order" />
<!--      <q-list v-for="i in jobs" :key="i.id"><q-item>{{ i.title }} - {{ i.location }} - {{ i.salary }}</q-item></q-list>-->
    </div>
  </q-page>
</template>

<script lang="ts">
// import { Todo, Meta } from 'models';
import {Job, OrderTerm} from 'components/models'
import {defineComponent, ref, reactive, watch, toRef, toRefs, customRef} from 'vue';
import JobList from 'components/JobList.vue'
export default defineComponent({
name: 'Jobs',
  components: { JobList },
  setup() {

  const jobs = ref<Job[]>([
    { title: 'farm worker', location: 'Ion Ranch', salary: 30000, id: '1' },
    { title: 'quarryman', location: 'death mountain', salary: 40000, id: '2' },
    { title: 'flute player', location: 'the lost woods', salary: 35000, id: '3' },
    { title: 'fisherman', location: 'lake hylia', salary: 21000, id: '4' },
    { title: 'prison guard', location: 'gerudo valley', salary: 32000, id: '5' }
    ]
  )

    // <> this is a generic argument
    const order = ref<OrderTerm>('title')
    const handleClick = (term: OrderTerm) => {
      order.value = term
    }

    const cube = reactive({
      length: 10,
      width: 20,
      height: 30
    })

    const lengthFromToRef = toRef(cube, 'length')
    const {length, width, height}  = toRefs(cube)

    // example of a custom ref, where when a button is clicked we change a name to another name in say 2000 s
    const useDebouncedRef = (value: string, delay = 1000) =>
    {
      let timeout: number;
      return customRef((track, trigger) => {
        return {
          get() {
            track()
            return value
          },
          set(newValue: string) {
            clearTimeout(timeout)
            setTimeout(() => {
              value = newValue
              trigger()
            }, delay)
          }
        }
      })
    }

    const test = useDebouncedRef('marvin')

    const change = () => {
    test.value = 'espira'
    }


    watch(order, (order) => {
      console.log('watching order', order)
    })

    return {
      jobs, handleClick, order, cube, lengthFromToRef, length, width , height, test, change
    }
  }

})
</script>

<style scoped>

</style>
