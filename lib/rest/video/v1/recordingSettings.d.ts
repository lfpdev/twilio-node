/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../base/Page');
import Response = require('../../../http/response');
import V1 = require('../V1');
import serialize = require('../../../base/serialize');
import { SerializableClass } from '../../../interfaces';

/**
 * Initialize the RecordingSettingsList
 *
 * PLEASE NOTE that this class contains preview products that are subject to
 * change. Use them with caution. If you currently do not have developer preview
 * access, please contact help@twilio.com.
 *
 * @param version - Version of the resource
 */
declare function RecordingSettingsList(version: V1): RecordingSettingsListInstance;

/**
 * Options to pass to create
 *
 * @property awsCredentialsSid - The SID of the stored Credential resource
 * @property awsS3Url - The URL of the AWS S3 bucket where the recordings should be stored
 * @property awsStorageEnabled - Whether all recordings should be written to the aws_s3_url
 * @property encryptionEnabled - Whether all recordings should be stored in an encrypted form
 * @property encryptionKeySid - The SID of the Public Key resource to use for encryption
 * @property friendlyName - A string to describe the resource
 */
interface RecordingSettingsInstanceCreateOptions {
  awsCredentialsSid?: string;
  awsS3Url?: string;
  awsStorageEnabled?: boolean;
  encryptionEnabled?: boolean;
  encryptionKeySid?: string;
  friendlyName: string;
}

interface RecordingSettingsListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): RecordingSettingsContext;
  /**
   * Constructs a recording_settings
   */
  get(): RecordingSettingsContext;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

interface RecordingSettingsPayload extends RecordingSettingsResource, Page.TwilioResponsePayload {
}

interface RecordingSettingsResource {
  account_sid: string;
  aws_credentials_sid: string;
  aws_s3_url: string;
  aws_storage_enabled: boolean;
  encryption_enabled: boolean;
  encryption_key_sid: string;
  friendly_name: string;
  url: string;
}

interface RecordingSettingsSolution {
}


declare class RecordingSettingsContext {
  /**
   * Initialize the RecordingSettingsContext
   *
   * PLEASE NOTE that this class contains preview products that are subject to
   * change. Use them with caution. If you currently do not have developer preview
   * access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   */
  constructor(version: V1);

  /**
   * create a RecordingSettingsInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  create(opts: RecordingSettingsInstanceCreateOptions, callback?: (error: Error | null, item: RecordingSettingsInstance) => any): Promise<RecordingSettingsInstance>;
  /**
   * fetch a RecordingSettingsInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: RecordingSettingsInstance) => any): Promise<RecordingSettingsInstance>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}


declare class RecordingSettingsInstance extends SerializableClass {
  /**
   * Initialize the RecordingSettingsContext
   *
   * PLEASE NOTE that this class contains preview products that are subject to
   * change. Use them with caution. If you currently do not have developer preview
   * access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   */
  constructor(version: V1, payload: RecordingSettingsPayload);

  private _proxy: RecordingSettingsContext;
  accountSid: string;
  awsCredentialsSid: string;
  awsS3Url: string;
  awsStorageEnabled: boolean;
  /**
   * create a RecordingSettingsInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  create(opts: RecordingSettingsInstanceCreateOptions, callback?: (error: Error | null, items: RecordingSettingsInstance) => any): Promise<RecordingSettingsInstance>;
  encryptionEnabled: boolean;
  encryptionKeySid: string;
  /**
   * fetch a RecordingSettingsInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: RecordingSettingsInstance) => any): Promise<RecordingSettingsInstance>;
  friendlyName: string;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  url: string;
}


declare class RecordingSettingsPage extends Page<V1, RecordingSettingsPayload, RecordingSettingsResource, RecordingSettingsInstance> {
  /**
   * Initialize the RecordingSettingsPage
   *
   * PLEASE NOTE that this class contains preview products that are subject to
   * change. Use them with caution. If you currently do not have developer preview
   * access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V1, response: Response<string>, solution: RecordingSettingsSolution);

  /**
   * Build an instance of RecordingSettingsInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: RecordingSettingsPayload): RecordingSettingsInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { RecordingSettingsContext, RecordingSettingsInstance, RecordingSettingsInstanceCreateOptions, RecordingSettingsList, RecordingSettingsListInstance, RecordingSettingsPage, RecordingSettingsPayload, RecordingSettingsResource, RecordingSettingsSolution }
