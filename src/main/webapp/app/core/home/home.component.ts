import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import AutocompleteDropdown from '../../shared/ui-components/autocompleteDropdown.vue';

@Component({
  components: {
    'autocomplete-dropdown': AutocompleteDropdown,
  },
})
export default class Home extends Vue {
  @Inject('loginService')
  private loginService: () => LoginService;

  // ------- Sample -----------
  public lookupData = [
    { book: 'Vue.js in Action', author: 'Erik Hanchett and Benjamin Listwon', price: '44.99' },
    { book: 'Fullstack Vue', author: 'Hassan Djirdeh , Nate Murray, et al.', price: '39.00' },
    { book: 'Getting to Know Vue.js', author: 'Brett Nelson', price: '37.99' },
    { book: 'Learning Vue.js 2', author: 'Olga Filipova', price: '44.99' },
  ];

  public selectedBookName = '';
  public selectedBook = {};

  public onSelectData(data) {
    this.selectedBook = data;
  }

  // ------- Sample end -------

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }
}
