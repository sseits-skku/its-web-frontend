<template lang="pug">
  v-container.fluid.fill-height(v-if="doRecruit")
    v-card.align-center.justify-center.mx-auto(
      min-width="600px"
      max-width="800px"
    )
      v-stepper.mx-auto(
        v-model="step"
        alt-labels
      )
        v-stepper-header
          v-stepper-step.Sans(
            :complete="step > 1"
            step="1"
            editable
          ) 지원 참고사항
          v-divider
          v-stepper-step.Sans(
            :complete="step > 2"
            step="2"
            editable
          ) 적성 확인
          v-divider
          v-stepper-step.Sans(
            :complete="step > 3"
            step="3"
            editable
          ) 지원서 작성
          v-divider
          v-stepper-step.Sans(
            step="4"
            editable
          ) 일정 조율
        v-stepper-items
          v-stepper-content(step="1")
            v-card.elevation-0.mb-4
              v-card-title.display-1.Sans(v-html="title")
              v-card-text.text--primary.title.Sans.pb-0 SSE-ITS에 지원함에 있어서 다음 사항을 숙지하시기 바랍니다.
              v-card-text.text--primary.subtitle-2.Sans.py-1(v-html="intro")
              v-card-text.text--primary.title.Serif.pt-2 위 내용에 동의하십니까?
              v-card-actions
                v-spacer
                v-btn.success.Sans(@click.native="step = 2") 네, 동의합니다.
                v-spacer
                v-btn.error.Sans(@click.native="goHome") 아니오, 동의하지 않습니다.
                v-spacer
          v-stepper-content(step="2")
            v-card.elevation-0.mb-4
              v-card-title.display-1.Sans 인적 사항
              v-card-text.Sans
                v-text-field(
                  v-model="fullname"
                  label="이름"
                )
                v-text-field(
                  v-model="skkuId"
                  label="학번"
                  :rules="[rules.skku_id]"
                )
                v-text-field(
                  v-model="phoneNum"
                  label="전화번호 ('-' 없이 작성)"
                  :rules="[rules.phone_num]"
                )
              v-card-title.display-1.Sans 적성 확인
              v-card-text.Sans (솔직하게 답변해 주세요)
              v-card-text.text--primary.mt-2.pb-1
                v-divider
                v-row.align-center
                  v-col.text-right.title.Sans 나는 프로그래밍을<br>{{ pSkill.items[pSkill.select] }}
                  v-col
                    v-slider.Sans(
                      v-model="pSkill.select"
                      min="0"
                      max="4"
                      vertical
                      :tick-labels="pSkill.level"
                    )
                v-divider
                v-row.align-center
                  v-col.text-right.title.Sans 나는 게임을<br>{{ gSkill.items[gSkill.select] }}
                  v-col
                    v-slider.Sans(
                      v-model="gSkill.select"
                      min="0"
                      max="4"
                      vertical
                      :tick-labels="gSkill.level"
                    )
                v-divider
                v-row.align-center
                  v-col.text-right.title.Sans 나는 사람들과 친해지기<br>{{ hSkill.items[hSkill.select] }}
                  v-col
                    v-slider.Sans(
                      v-model="hSkill.select"
                      min="0"
                      max="4"
                      vertical
                      :tick-labels="hSkill.level"
                    )
                v-divider
                v-row.align-center
                  v-col.text-right.title.Sans 나는 미(美)적 감각이<br>{{ vSkill.items[vSkill.select] }}
                  v-col
                    v-slider.Sans(
                      v-model="vSkill.select"
                      min="0"
                      max="4"
                      vertical
                      :tick-labels="vSkill.level"
                    )
                v-divider
              v-card-actions
                v-spacer
                v-btn.success.Sans(@click.native="step = 3") 다음
                v-spacer
                v-btn.secondary.Sans(@click.native="step = 1") 이전
                v-spacer
          v-stepper-content(step="3")
            v-card.elevation-0.mb-4
              v-card-title.display-1.Sans 지원서 작성
              v-card-text.text--primary.mt-2.pb-1
                v-textarea.Sans(
                  v-if="!showPreview"
                  id="inputTextField"
                  v-model="textContent"
                  counter
                  single-line
                  full-width
                  auto-grow
                )
                div.text--primary.Sans(
                  v-if="!!(showPreview)"
                  v-html="shownContent"
                  style="line-height: 200%;"
                )
              v-card-actions
                v-spacer
                v-btn.success.Sans(@click.native="step = 4") 다음
                v-spacer
                v-btn.warning.Sans(@click.native="showPreview = !showPreview") Preview
                v-spacer
                v-btn.secondary.Sans(@click.native="step = 2") 이전
                v-spacer
          v-stepper-content(step="4")
            v-card.elevation-0.mb-4
              v-card-title.display-1.Sans 일정 조율
              v-card-text.Sans.text--primary.subtitle-2.mt-2.pb-1 (대충 일정을 조율하기위해 달력을 표시한다는 이모티콘)
              v-card-actions
                v-spacer
                v-btn.primary.Sans(
                  :loading="submitLoading"
                  @click.native="submit"
                ) 제출
                v-spacer
                v-btn.secondary.Sans(@click.native="step = 3") 이전
                v-spacer
  v-container.fluid.fill-height(v-else)
    v-col
      v-row.align-center.justify-center
        h1.text-center.Sans 지금은 SSE-ITS 지원기간이 아닙니다.<br>지원기간에 지원해 주세요.
      v-row.align-center.justify-center.pt-5
        v-btn.primary.Sans(@click.native="$router.push('/')") 메인으로
</template>

<script>
export default {
  data () {
    return {
      rules: {
        skku_id: (value) => {
          const pattern = /^(\d)+$/
          if (pattern.test(value) && value.length <= 20) { return true }
          return '잘못된 학번입니다.'
        },
        phone_num: (value) => {
          const pattern = /^(\d|\+)+$/
          if (pattern.test(value) && value.length <= 20) { return true }
          return '잘못된 전화번호입니다.'
        }
      },
      doRecruit: true,
      showPreview: false,
      submitLoading: false,
      fullname: '',
      skkuId: '',
      phoneNum: '',
      pSkill: {
        select: 2,
        level: [1, 2, 3, 4, 5],
        items: ['전혀 못한다', '못한다', '그럭저럭 한다', '잘한다', '매우 잘한다']
      },
      gSkill: {
        select: 2,
        level: [1, 2, 3, 4, 5],
        items: ['전혀 못한다', '못한다', '그럭저럭 한다', '잘한다', '매우 잘한다']
      },
      hSkill: {
        select: 2,
        level: [1, 2, 3, 4, 5],
        items: ['많이 어려운 편이다', '어려운 편이다', '쉽지도 어렵지도 않다', '꽤 쉽게 친해진다', '아주 쉽게 친해진다']
      },
      vSkill: {
        select: 2,
        level: [1, 2, 3, 4, 5],
        items: ['전혀 없다', '부족한 편이다', '보통이다', '뛰어나다', '매우 뛰어나다']
      },
      textContent: '지원서는 주어진 양식이 없습니다.\nMarkdown 문법을 지원하며, 아래 \'PREVIEW\' 버튼을 눌러 미리볼 수 있습니다.\n자유롭게 작성해 주시면 됩니다.',
      step: 1,
      title: 'SSE-ITS에 지원해 주셔서 감사합니다.',
      intro: '<ol><li>SSE-ITS은 반도체시스템공학과 구성원을 위해 서비스 제공을 목적으로 하는 <b>학생단체</b>입니다.<br>' +
      '따라서, <i>같은 학생단체인 학생회 및 알리미에 동시 지원을 할 수 없는 점</i>을 양해바라며,<br>' +
      '지키지 않을 경우 합격에 불이익이 있을 수도 있습니다.</li>' +
      '<li>SSE-ITS에서는 다음과 같은 개인정보를 신입생 모집을 위해 수집합니다.<br>' +
      '<ul><li>성명</li><li>학번</li><li>전화번호</li></ul>' +
      '개인정보는 모집이 끝난 뒤 모두 폐기될 예정이며, SSE-ITS에 지원함으로서 개인정보 이용에 동의하는 것으로 간주됩니다.</li>' +
      '<li>SSE-ITS의 구성원이 되면, 다음 사항들을 대여받습니다.' +
      '<ul><li>시스템실 개인 좌석</li><li>시스템실 개인 컴퓨터</li><li>시스템실 출입</li><li>반도체관 출입시스템 관리 권한</li></ul>' +
      'SSE-ITS의 구성원 세부 직책에 따라 다음 권한도 부여 받을 수 있습니다.' +
      '<ul><li>학과 서버 관리 권한</li><li>학과 서비스 관리 권한</li></ul>' +
      '</li>' +
      '<li>SSE-ITS의 구성원이 되면, 특별한 예외나 사전조율이 없는 경우 다음 사항을 반드시 수행해야 합니다.<br>' +
      '<ul><li>매 학기 지정된 Office-Hour 업무</li>' +
      '<i>Office-Hour는 시스템실에 일정 시각동안 시스템실 상시 대기 업무를 말함</i><br>' +
      '<li>주 1회 이상의 정기회의 참석</li>' +
      '<i>시험기간 2주 전부터는 정기회의와 Office-Hour가 없음</i></ul></li></ol>'
    }
  },
  computed: {
    cursorStart: {
      get () {
        if (process.client) {
          const el = document.getElementById('inputTextField')
          return el.selectionStart
        }
        return 0
      },
      set (value) {
        if (process.client) {
          const el = document.getElementById('inputTextField')
          el.selectionStart = value
        }
      }
    },
    cursorEnd: {
      get () {
        if (process.client) {
          const el = document.getElementById('inputTextField')
          return el.selectionEnd
        }
        return 0
      },
      set (value) {
        if (process.client) {
          const el = document.getElementById('inputTextField')
          el.selectionEnd = value
        }
      }
    },
    shownContent () { return this.$md.render(this.textContent) }/*,
    compressedContent () {
      return Pako.gzip(this.textContent, { level: 9 }).toString()
    }
    */
  },
  methods: {
    submit () {
      // TODO: submit recruit action
      this.goHome()
    },
    goHome () { this.$router.push('/') }
  }
}
</script>
