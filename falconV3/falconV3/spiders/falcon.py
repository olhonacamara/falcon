import scrapy

class FalconSpider(scrapy.Spider):

    name = 'falcon'
    start_urls = [
        'http://www.cmf.sc.gov.br/categoria-transparencia/sistema-de-gerenciamento-gabinete-parlamentar-sggp'
    ]

    def parse(self, response):
        for report in response.css('div.region-content'):
            yield {
                'title': report.xpath('//*[@id="node-8205"]/h2/a/text()'),
                'url': report.xpath('//*[@id="node-8205"]/h2/a/@href'),
                'post_date': report.xpath('//*[@id="node-7296"]/div[1]/span/text()[2]'),
            }


