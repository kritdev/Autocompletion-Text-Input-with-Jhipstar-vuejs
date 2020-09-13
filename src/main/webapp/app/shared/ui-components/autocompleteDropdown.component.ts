import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class AutocompleteDropdown extends Vue {
  public selectedOption: any = null;
  public searchText = '';
  public open = false;
  public highlightIndex = 0;
  public lastSearchText = '';
  public lastReturnSearchText = '';

  @Prop()
  options: Object;

  @Prop()
  placeholder: String;

  @Prop()
  selectedField: String;

  @Prop()
  onSelectedData: any;

  @Prop()
  classProperty: any;

  @Prop()
  required: false;

  @Prop()
  value: any;

  @Prop()
  public additionalDisplayField: any;

  public displayField = '';

  get matches() {
    const optionArray = [];

    if (this.displayField === '' || this.searchText === undefined) {
      return optionArray;
    }

    for (const key in this.options) {
      if (key in this.options) {
        optionArray.push([key, this.options[key]]);
      }
    }

    return optionArray.filter(option => {
      const optionText = option[1][this.displayField].toUpperCase();
      return optionText.match(this.searchText.toUpperCase().replace(/\s+/g, '.+'));
    });
  }

  public setOpen(isOpen: boolean) {
    this.open = isOpen;

    if (this.open) {
      // this.$refs.search.focus();
      // this.lastSearchText = this.searchText;
      this.searchText = '';
    } else {
      this.searchText = this.lastSearchText;
    }
  }

  public searchChanged() {
    if (!this.open) {
      this.open = true;
    }

    this.highlightIndex = 0;
  }

  public suggestionSelected(suggestion) {
    this.open = false;

    if (suggestion && this.searchText !== '') {
      this.searchText = suggestion[1][this.displayField];
    }

    // return selectedField
    this.lastSearchText = this.searchText;
    this.$emit('input', this.searchText);

    // callback
    if (this.onSelectedData && suggestion) {
      this.lastReturnSearchText = this.searchText;
      this.onSelectedData(suggestion[1]);
    } else {
      if (this.lastReturnSearchText !== this.searchText) {
        this.onSelectedData({});
      }
    }
  }

  public up() {
    if (this.open) {
      if (this.highlightIndex > 0) {
        this.highlightIndex--;
      }
    } else {
      this.setOpen(true);
    }
  }

  public down() {
    if (this.open) {
      if (this.highlightIndex < this.matches.length - 1) {
        this.highlightIndex++;
      }
    } else {
      this.setOpen(true);
    }
  }

  public updateComponentWithValue(newValue) {
    this.searchText = newValue;

    if (!newValue || newValue === '') {
      this.suggestionSelected(undefined);
    }
  }

  public mounted() {
    this.displayField = this.selectedField.toString();
  }

  @Watch('value')
  public onPropertyChanged(newValue: any, oldValue: any) {
    this.updateComponentWithValue(newValue);
  }
}

// *** credit - autocompletion ***
// https://designhammer.com/blog/reusable-vuejs-components-part-3-autocomplete-dropdown

// ** usage **
// <autocomplete-dropdown
//   id="autocomplete-dropdown"
//   :options="fruitOptions"
//   v-model="selectedFruit"
//   placeholder="Enter a fruit name"
// ></autocomplete-dropdown>
