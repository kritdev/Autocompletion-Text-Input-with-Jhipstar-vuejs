<template>
  <div class="dropdown" :class="{'open' : open}">
    <input type="text" class="form-control" :class="classProperty" :required="required"
      ref="search"
      :placeholder="placeholder"
      v-model="searchText"
      @input="searchChanged"
      @keydown.enter="suggestionSelected(matches[highlightIndex])"
      @blur="suggestionSelected(matches[highlightIndex])"
      @keydown.down="down"
      @keydown.up="up"
      @keydown.esc="setOpen(false)"
    />
    <!-- <a class="toggle" @mousedown.prevent @click="setOpen(!open)">
      <span class="arrow-up">▲</span>
      <span class="arrow-down">▼</span>
    </a> -->
    <ul class="suggestion-list">
      <li v-for="(suggestion, index) in matches" :key="index"
        :class="{'active' : index === highlightIndex}"
        @mousedown.prevent
        @click="suggestionSelected(suggestion)"
      >
        {{ suggestion[1][displayField] }}
        <span v-if="additionalDisplayField"> - {{ suggestion[1][additionalDisplayField] }}</span>
      </li>
    </ul>
  </div>
</template>

<style>
    @import "./autocompleteDropdown.css";
</style>

<script lang="ts" src="./autocompleteDropdown.component.ts">
</script>