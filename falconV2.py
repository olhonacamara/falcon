import PyPDF2
import os.path
from os import listdir
from os.path import isfile, join
import scrapy

# TODO: Acessar site de relatórios e baixar arquivos automaticamente.



diretorio = './sggp_relatorios/2016/'

# Retorna um array com todos os arquivos contido diretorio especificado.
arquivos = [f for f in listdir(diretorio) if isfile(join(diretorio, f))]

# Retorna um inteiro com a quantidade de arquivos encontrados.
num_arquivos = len([f for f in os.listdir(diretorio)
                if os.path.isfile(os.path.join(diretorio, f))])

print ('######################')
print ('##### Falcon v.2 #####')
print ('######################')
print ('Total de arquivos: ' + repr(num_arquivos))

totalPages = 0
for arquivo in arquivos:
    print ('Convertendo para TXT: ' + arquivo)
    filePdf = open(diretorio+arquivo, 'rb')
    pdfReader = PyPDF2.PdfFileReader(filePdf)
    numPages = pdfReader.getNumPages()
    newTxtFile = open(arquivo.split('.')[0] + '.txt', 'w')
    totalPages = (totalPages + numPages)


    count = 0
    while count < numPages:
        pageobj = pdfReader.getPage(count)
        newTxtFile.write(pageobj.extractText().encode('utf-8').strip())
        count += 1

    filePdf.close()
    newTxtFile.close()

print('Total de paginas convertidas: ' + repr(totalPages))

