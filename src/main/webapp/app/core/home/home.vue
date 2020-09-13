<template>
    <div>
        <div id="div-heading" style="text-align: center;">
            <h2 id="page-heading">
                <span>Sample Autocompletion Text Input</span>
            </h2>
        </div>
        <div class="row justify-content-center">
            <autocomplete-dropdown
                :options="lookupData"
                :selectedField="'book'"
                :additionalDisplayField="'author'"
                :onSelectedData="onSelectData"
                :classProperty="{'valid': selectedBookName!=='', 'invalid': selectedBookName==='' }"
                :required="true"
                v-model="selectedBookName"
                placeholder="Enter a book name"            
            ></autocomplete-dropdown>
        </div>
        <br>
        selectedBookName = {{selectedBookName}} <br>
        selected book = {{selectedBook}}
    </div>
</template>

<script lang="ts" src="./home.component.ts">
</script>
