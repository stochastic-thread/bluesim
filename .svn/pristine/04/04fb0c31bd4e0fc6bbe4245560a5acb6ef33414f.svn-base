#!/usr/bin/python

# post-commit: Hook used for SVN post commits
#
# Dmitry Minsky
# dmitry.minsky@gmail.com

# This script is set to publish information after SVN commits to Slack. 

import sys
import subprocess
import urllib
import urllib2
import json

# Set slack info
TOKEN = 'gp11TY2A4tgIh1oRdwtyJkCk' # token like cg3MI88ufdGWwT5RbojoLJCV
DOMAIN = 'bluesim.slack.com' # for example companyname.slack.com
REPO_BASE_URL = 'https://vis.cs.umd.edu/svn/projects/bluesim' # for example http://svn.companyname.com/

# svnlook location
LOOK='svnlook'


def sendSlack( domain, token, payload ):
    # create request url
    url = 'https://' + domain + '/services/hooks/subversion?token=' + token
    # urlencode and post
    urllib2.urlopen( url, urllib.urlencode( { 'payload' : json.dumps( payload ) } ) )

def runLook( *args ):
    p = subprocess.Popen(' '.join([LOOK] + list(args)), stdout=subprocess.PIPE, shell=True, stderr=subprocess.STDOUT )
    out, err = p.communicate()
    return out

def getCommitInfo( repo, revision ):
    comment = runLook('log', repo, '-r', revision)
    author = runLook('author', repo, '-r', revision)
    files = runLook('changed', repo, '-r', revision)

    payload = {
        'revision' : revision,
        'url' : REPO_BASE_URL + repo + '?=' + revision,
        'author' : author,
        'log' : comment,
    }

    return payload

def main(): 
    payload = getCommitInfo( sys.argv[1], sys.argv[2] )
    sendSlack( DOMAIN, TOKEN, payload )

if __name__ == '__main__':
    main()