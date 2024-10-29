<template>
    <div class="flex ">
      <div class="w-full">
      <BaseInput
          v-model="fields.second"
          icon="lucide:search"
          size="lg"
          rounded="md"
          placeholder="جست و جو کنید..."

      />
      </div>
      <div class="ml-4">

        <BaseButton variant="solid" color="primary" size="lg"
        >
          جستجو
        </BaseButton>
      </div>
    </div>




</template>

<script setup lang="ts">
const fields = reactive({
  first: '',
  second: '',
  third: '',
  fourth: '',
})
</script>
