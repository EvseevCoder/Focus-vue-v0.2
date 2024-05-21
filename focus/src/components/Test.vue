<template>
  <div :class="$style.InnovationsCards">
      <div v-for="(card, index) in cards"
           :key="index"
           :class="[$style.card, {[$style._fullWidth]: cards.length % 2 !== 0 && index === (cards.length - 1)}]"
           @click="handleToogle(index)">
          <div :class="$style.cardFront">
              <div v-if="card.title"
                   :class="$style.cardTitle"
                   v-html="isOrdered ? (index + 1) + '. ' + card.title : card.title">
              </div>
              <div ref="footer"
                   :class="$style.cardFooter">
                  <VCircleButton ref="btns"
                                 :class="$style.cardBtn"
                                 :color="$deviceIs.mobile ? 'primary' : 'secondary'">
                      <VIcon
                          size="custom"
                          name="arrow-right-sharp"
                      />
                  </VCircleButton>
                  <div v-if="card.icon_logo"
                       :class="$style.cardIcon">
                      <img :src="card.icon_logo"
                           alt="icon">
                  </div>
              </div>
          </div>

          <div v-if="card.on_hover_description"
               ref="cardsBack"
               :class="$style.cardBack">
              <div :class="$style.cardText"
                   v-html="card.on_hover_description">
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
      name: 'Test',
      props: {
          cards: {
              type: Array,
              default: () => [],
          },

          isOrdered: {
              type: Boolean,
              default: true,
          },
      },

      computed: {
          activeCards: function() {
              const arr = [];
              for (let i = 0; i < this.cards.length; i++) {
                  arr[i] = false;
              }
              return arr;
          },
      },

      methods: {
          handleToogle(index) {
              if (!this.$deviceIs.mobile) {
                  return;
              }

              this.activeCards[index] = !this.activeCards[index];

              if (this.activeCards[index]) {
                  gsap.to(this.$refs.cardsBack[index], {
                      duration: .4,
                      marginBottom: 24,
                      height: 'auto',
                  });
                  gsap.to(this.$refs.footer[index], {
                      duration: .4,
                      rotate: 180,
                  });
              } else {
                  gsap.to(this.$refs.cardsBack[index], {
                      duration: .4,
                      marginBottom: 0,
                      height: 0,
                  });
                  gsap.to(this.$refs.footer[index], {
                      duration: .4,
                      rotate: 0,
                  });
              }
          },
      },
  };
</script>

<style lang="scss" module>
  .InnovationsCards {
      align-self: flex-start;
      display: flex;
      flex-wrap: wrap;
      gap: 1.6rem;
      max-width: 91.2rem;

      @include respond-to(xs) {
          flex-direction: column;
          justify-content: flex-start;
          gap: 0;
          width: 100%;
          padding: 0;
      }
  }

  .card {
      position: relative;
      flex-basis: calc(50% - .8rem);
      //flex-shrink: 0;
      overflow: hidden;
      width: 44.8rem;
      height: 27.8rem;
      border: 1px solid $base-100;
      border-radius: .8rem;
      cursor: pointer;

      &:hover {
          .cardFront {
              //opacity: 0;

              @include respond-to(xs) {
                  opacity: 1;
              }
          }

          .cardBack {
              opacity: 1;
          }

          .cardBtn {
              opacity: 0;
          }
      }

      &._fullWidth {
          flex-basis: 100%;

          @include respond-to(xs) {
              flex-basis: auto;
          }
      }

      @include respond-to(xs) {
          flex-basis: auto;
          width: 100%;
          height: auto;
          border: none;
          border-top: 1px solid $base-100;
          border-radius: initial;
      }
  }

  .cardFront {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      padding: 3.2rem;
      border-radius: .8rem;
      background-color: $base-0;
      opacity: 1;
      transition: opacity $default-transition;

      @include respond-to(xs) {
          flex-direction: row;
          align-items: center;
          padding: 24px $side-padding-mobile 24px $side-padding-mobile;
          border-radius: initial;
      }
  }

  .cardTitle {
      @include text(p4);

      @include respond-to(xs) {
          @include text(t5);
      }
  }

  .cardFooter {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
  }

  .cardBtn {
      transition: opacity $default-transition;

      svg {
          fill: $primary-500;

          @include respond-to(xs) {
              fill: $base-0;
          }
      }

      @include respond-to(xs) {
          transform: rotate(90deg);

          :global(.frame-icon_xbig) {
              width: 20px;
              height: 20px;
          }
      }
  }

  .cardIcon {
      position: relative;
      overflow: hidden;
      width: 6.4rem;
      height: 6.4rem;

      img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
      }

      @include respond-to(xs) {
          display: none;
      }
  }

  .cardBack {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 3.2rem 3.2rem 0 3.2rem;
      border-radius: .8rem;
      background-color: $primary-500;
      opacity: 0;
      transition: opacity $default-transition;

      @include respond-to(xs) {
          position: static;
          height: 0;
          opacity: 1;
          padding: 0 $side-padding-mobile;
          border-radius: initial;
          background-color: $base-0;
      }
  }

  .cardText {
      @include text(p5);

      color: $base-0;
      font-family: $additional-font-family;

      ul {
          padding-left: 1.6rem;

          li {
              list-style-type: disc;
              margin-bottom: .8rem;

              &:last-child {
                  margin-bottom: 0;
              }
          }
      }

      @include respond-to(xs) {
          @include text(p6);

          color: $base-1000;
      }
  }
</style>
