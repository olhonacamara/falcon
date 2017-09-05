from scrapy.spiders import Spider
from tutsplus.items import TutsplusItem
from scrapy.http    import Request

class MySpider(Spider):
    name            = "tutsplus"
    allowed_domains  = ["www.cmf.sc.gov.br/vereador/pedro-de-assis-silvestre"]
    start_urls       = ["http://www.cmf.sc.gov.br/vereador/pedro-de-assis-silvestre"]
    
    def parse(self, response):
      titles = response.xpath('//p/text()').extract()
      
      for title in titles:
        item = TutsplusItem()
        item["title"] = title
        yield item
