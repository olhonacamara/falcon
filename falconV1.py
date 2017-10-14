import PyPDF2

file=open('nome_do_arquivo.pdf', 'rb')

pdfreader=PyPDF2.PdfFileReader(file)

numPages = pdfreader.getNumPages()
print(numPages)

newTxtFile=open('nome_do_arquivo.txt', 'w')


count = 0
while count < numPages:
    pageobj=pdfreader.getPage(count)
    newTxtFile.write(pageobj.extractText().encode('utf-8').strip())
    count += 1

file.close()
newTxtFile.close()
