<template>
  <div>
    <DynamoDb/>
  </div>
</template>

<script>
// @ is an alias to /src
import DynamoDb from '@/components/DynamoDb.vue'

export default {
  name: 'dynamo',
  components: {
    DynamoDb
  }
}
</script>
