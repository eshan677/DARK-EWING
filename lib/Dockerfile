FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/KING-AMDA-MD/DARK-EWING-MD /root/KING-AMDA-MD
WORKDIR /root/KING-AMDA-MD/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
