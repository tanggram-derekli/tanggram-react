import request from 'superagent';
import {toUrl} from '../util';

/**
 * Create the http resource.
 * 
 * @param baseUrl
 * @returns {{get: get, post: post}}
 */
export function createResource(baseUrl) {
  async function get(uri, queries) {
    const url = toUrl(baseUrl, uri);
    return await request
      .get(url)
      .withCredentials()
      .query(queries);
  }

  async function post(uri, postData) {
    const url = toUrl(baseUrl, uri);
    return await request
      .post(url)
      .set('content-type', 'application/json')
      .withCredentials()
      .send(JSON.stringify(postData));
  }

  return {
    get,
    post,
  };
}

/**
 * Create the http resource with acl header.
 * 
 * @param baseUrl
 * @param aclSessionHeader
 * @returns {{get: get, post: post}}
 */
export function createAclResource(baseUrl, aclSessionHeader = 'acl-session-id') {
  async function get(uri, queries, aclSessionId) {
    const url = toUrl(baseUrl, uri);
    // console.log(auth.session);
    return await request
      .get(url)
      .withCredentials()
      .set({[aclSessionHeader]: aclSessionId})
      .query(queries);
  }

  async function post(uri, postData, aclSessionId) {
    const url = toUrl(baseUrl, uri);
    return await request
      .post(url)
      .set('content-type', 'application/json')
      .withCredentials()
      .set({[aclSessionHeader]: aclSessionId})
      .send(JSON.stringify(postData));
  }

  return {
    get,
    post,
  };
}
