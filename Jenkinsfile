def GIT_CREDENTIALS='github-username-and-token-as-password'
def FAILED_STAGE = 'BUILD'

pipeline {
  agent {
    kubernetes {
      label 'vivid-design-patterns-2018-11-09-5'
      idleMinutes 10
      yamlFile 'jenkins/kubernetes/build-pod.yaml'
    }
  }

  parameters {
    booleanParam(name: 'PACKAGE', defaultValue: true, description: 'Toggle to turn on or off the compilation / containerization stages')
  }

  environment {
    //
    // Don't remove BRANCH_LOWER. it is used in deploy-config.yaml file
    //
    BRANCH_LOWER = sh returnStdout: true, script: "echo ${ buildContext.branchName(env) } | awk '{print tolower(\$0)}' | tr -d '\n'"
  }

  stages {
    stage('Produce Image') {
      when {
        expression {
          return params.PACKAGE
        }
        not {
          expression { buildContext.branchName(env) == 'master' }
        }
      }
      steps {
        container('docker') {
          sh 'docker build -t vividseats/vivid-design-patterns:$BRANCH_LOWER .'
        }
      }
    }

    stage('Push Image') {
      when {
        expression {
          return params.PACKAGE
        }
        not {
          anyOf {
            expression { buildContext.branchName(env) == 'master' }
          }
        }
      }
      steps {
        container('docker') {
          sh 'docker push vividseats/vivid-design-patterns:$BRANCH_LOWER'
        }
      }
    }

    stage('Deploy Feature') {
      when {
        not {
          anyOf {
            expression { buildContext.branchName(env) == 'master' }
          }
        }
      }
      options {
        timeout(time: 10, unit: 'MINUTES')
      }
      steps {
        script {
          FAILED_STAGE = 'DEPLOY'
        }
        container('skipper') {
          dir('jenkins') {
            sh "skipper deploy -n vivid-design-patterns ${ buildContext.branchName(env) } --render-values-file"
            sh "skipper deploy -n vivid-design-patterns ${ buildContext.branchName(env) }"
          }
        }
      }
    }
  }
  post {
    success {
      script {
        slackSend(color: '#339966', message: "Vivid Design Patterns » SUCCESS » Job '${env.JOB_NAME} [$env.BUILD_NUMBER]' (<${env.BUILD_URL}|Open>)\n*${buildContext.branchName(env)}*", channel: "${CHANNEL}")
      }
    }
    failure {
      script {
        slackSend(color: '#990000', message: "Vivid Design Patterns » ${FAILED_STAGE} FAILED » Job '${env.JOB_NAME} [$env.BUILD_NUMBER]' (<${env.BUILD_URL}|Open>)\n*${buildContext.branchName(env)}*", channel: "${CHANNEL}")
      }
    }
    aborted {
      script {
        slackSend(color: '#CC9933', message: "Vivid Design Patterns » ABORTED » Job '${env.JOB_NAME} [$env.BUILD_NUMBER]' (<${env.BUILD_URL}|Open>)\n*${buildContext.branchName(env)}*", channel: "${CHANNEL}")
      }
    }
  }
}
