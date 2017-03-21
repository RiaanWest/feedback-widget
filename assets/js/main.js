var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCbsO5CllIyxtSaVpET2VNayssy7TnwS10",
  authDomain: "fire-starter-ce95c.firebaseapp.com",
  databaseURL: "https://fire-starter-ce95c.firebaseio.com",
  storageBucket: "fire-starter-ce95c.appspot.com",
  messagingSenderId: "114575192863"
});
var reviewsRef = firebaseApp.database().ref('reviews');

new Vue({
  el: '#app',
  data: {
    widgetIsExpanded: false,
    currentStep: 0,
    formSubmitAttempted: false,
    review: {
      rating: 0,
      name: '',
      email: '',
      feedback: '',
      url: ''
    }
  },
  firebase: {
    reviews: reviewsRef
  },
  methods: {
    widgetOpen: function(e) {
      var vi = this;
      this.widgetIsExpanded = true;
      setTimeout(function() {
        vi.currentStep = 1;
      }, 400);
    },
    widgetClose: function() {
      this.widgetIsExpanded = false;
      this.currentStep = 0;
    },
    starOver: function(value) {
      this.review.rating = value;
    },
    ratingClick: function() {
      this.currentStep = 2;
    },
    submitForm: function () {
      this.formSubmitAttempted = true;
      this.setURL();

      if (this.isValid) {
        reviewsRef.push(this.review);
        this.review.name = '';
        this.review.email = '';
        this.currentStep = 3;
      }
    },
    setURL: function() {
      this.review.url = (window.location != window.parent.location)
        ? document.referrer
        : document.location.href;
      console.log(this.review.url);

    }
  },
  computed: {
    validation: function () {
      return {
        name: !!this.review.name.trim(),
        email: emailRE.test(this.review.email)
      }
    },
    isValid: function () {
      var validation = this.validation;
      console.log(validation);
      this.feedback = validation.name;
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
})
