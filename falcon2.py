import PyPDF2
import os.path
from os import listdir
from os.path import isfile, join


diretorio = './sggp_relatorios/2017/test/'

# Retorna um array com todos os arquivos contido diretorio especificado.
arquivos = [f for f in listdir(diretorio) if isfile(join(diretorio, f))]

# Retorna um inteiro com a quantidade de arquivos enontrados.
num_arquivos = len([f for f in os.listdir(diretorio)
                if os.path.isfile(os.path.join(diretorio, f))])

print("Total de arquivos: " + `num_arquivos`)

for arquivo in arquivos:
    filePdf = open(diretorio+arquivo, 'rb')
    pdfreader = PyPDF2.PdfFileReader(filePdf)
    newTxtFile = open(arquivo.split('.')[0], 'w')
    print arquivo


#print(os.path.abspath(diretorio))
#pathFilePdf = 'sggpJaneiro2017.pdf'
#splitName = pathFilePdf.split('.')
#print(splitName[0])

numPages = pdfreader.getNumPages()
print(numPages)

newTxtFile=open('sggpJaneiro2017.txt', 'w')

count = 0
while count < numPages:
    pageobj=pdfreader.getPage(count)
    newTxtFile.write(pageobj.extractText().encode('utf-8').strip())
    count += 1

filePdf.close()
newTxtFile.close()
