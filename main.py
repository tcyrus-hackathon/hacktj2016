import fbchat
import ConfigParser

Config = ConfigParser.ConfigParser()
Config.read("config.ini")

MESSENGER_ID = Config.get('Messenger', 'ID')
MESSENGER_PASSWORD = Config.get('Messenger', 'PASSWORD')


client = fbchat.Client(MESSENGER_ID, MESSENGER_PASSWORD)
threads = client.getThreadList(0)
print(threads)