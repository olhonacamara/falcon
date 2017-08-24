import PyPDF2
file=open('sggp_novembro_2016.pdf', 'rb')
pdfreader=PyPDF2.PdfFileReader(file)

numPages = pdfreader.getNumPages()
print(numPages)

newfile=open('test.txt', 'w')

count = 0
while count < numPages:
    pageobj=pdfreader.getPage(count)
    newfile.write(pageobj.extractText().encode('utf-8').strip())
    count += 1

file.close()
newfile.close()
