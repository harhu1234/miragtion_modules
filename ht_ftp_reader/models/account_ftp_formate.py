import ftplib
import ntpath

ftp = ftplib.FTP('192.106.0.107', 'ftpuser','aashish.odoo')
files = ftp.dir()
print(files)


# Get the readme file
# ftp.cwd("/pub")
# gFile = open("readme.txt", "wb")
# ftp.retrbinary('RETR Readme', gFile.write)
# gFile.close()
# ftp.quit()

# Print the readme file contents
# print "\nReadme File Output:"
# gFile = open("readme.txt", "r")
# buff = gFile.read()
# print buff
# gFile.close()