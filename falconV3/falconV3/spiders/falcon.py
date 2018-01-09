import scrapy

class FalconSpider(scrapy.Spider):
    name = 'falcon'

    def start_requests(self):
        urls = [
            'http://www.cmf.sc.gov.br/categoria-transparencia/sistema-de-gerenciamento-gabinete-parlamentar-sggp'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = response.url.split("/")[-2]
        filename = 'report-%s.html' % page
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)


    # TODO: Fazer método que retorna as URLS válidas que contém relatórios.