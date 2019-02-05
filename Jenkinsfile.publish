def GIT_CREDENTIALS='github-username-and-token-as-password'

pipeline {
  agent {
    kubernetes {
      label 'vivid-design-patterns'
      idleMinutes 10
      yamlFile 'jenkins/kubernetes/build-pod.yaml'
    }
  }

  parameters {
    choice(choices: ['major', 'minor', 'patch'], description: 'What kind of update is this?', name: 'SEM_VER_TYPE')
  }

  stages {
    stage('Version') {
      steps {
        container('node') {
            // sh 'yarn version --${params.SEM_VER_TYPE}'
            sh 'echo "yarn version"'
        }
      }
    }

    stage('Publish') {
        steps {
            container('node') {
                //sh 'yarn publish'
                sh 'echo "yarn publish"'
            }
        }
    }

    post {
        success {
            //git push origin/stage
            git checkout master
            echo "hello"
            //git merge stage
            //git push origin/master --follow-tags
        }
    }
   }
}