import sys
import OSC
import Queue
import time, threading


# send port 7373
client = OSC.OSCClient()
client.connect(('127.0.0.1', 7373))
queueRap = Queue.Queue()

# # recieve message
# receive_address = '127.0.0.1', 12000
# s = OSC.OSCServer(receive_address)  # basic
# s.addDefaultHandlers()


# def visualize_handler(addr, tags, stuff, source):
#     '''called by new_phrase'''
#     print "hey!"
#     print stuff
#     sentence = stuff[0]
#     queueRap.put(sentence)

# s.addMsgHandler("/visualize", visualize_handler)
# print "\nStarting OSCServer. Use ctrl-C to quit."
# st = threading.Thread(target=s.serve_forever)
# st.start()

# try:
#     while 1:
#         time.sleep(5)

# except KeyboardInterrupt:
#     print "\nClosing OSCServer."
#     s.close()
#     print "Waiting for Server-thread to finish"
#     st.join()
#     print "Done"

# interface method for api to call


def send_lyrics(message):
    msg = OSC.OSCMessage()
    msg.setAddress("/new_phrase")
    msg.append(message)
    client.send(msg)
    print "send done"


def receive_lyrics():
    if queueRap.qsize() > 0:
        msg = queueRap.get()
        print msg
        return msg
    else:
        return ""


def stash_lyrics(msg):
    queueRap.put(msg)
